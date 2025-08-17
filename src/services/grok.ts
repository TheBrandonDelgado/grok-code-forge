import type { GrokAnalysisResponse } from '../types';

const GROK_API_KEY = import.meta.env.VITE_GROK_API_KEY;
const GROK_API_URL = 'https://api.x.ai/v1/chat/completions';

if (!GROK_API_KEY) {
  console.warn('Grok API key not found. AI analysis will not work.');
}

export const grokService = {
  async analyzeCode(code: string, language?: string): Promise<GrokAnalysisResponse> {
    if (!GROK_API_KEY) {
      throw new Error('Grok API key not configured');
    }

    const prompt = `Analyze the following ${language || 'code'} and provide a detailed review in JSON format. Focus on:

1. Bugs: Identify any bugs, errors, or issues with severity levels (low, medium, high, critical)
2. Optimizations: Suggest performance, readability, security, and best practice improvements
3. Explanations: Provide clear explanations for complex parts of the code

Return the analysis in this exact JSON format:
{
  "bugs": [
    {
      "id": "unique_id",
      "line_number": line_number_if_applicable,
      "severity": "low|medium|high|critical",
      "description": "description_of_the_bug",
      "suggestion": "how_to_fix_it"
    }
  ],
  "optimizations": [
    {
      "id": "unique_id",
      "line_number": line_number_if_applicable,
      "type": "performance|readability|security|best_practice",
      "description": "what_can_be_improved",
      "suggestion": "how_to_improve_it",
      "impact": "low|medium|high"
    }
  ],
  "explanations": [
    {
      "id": "unique_id",
      "section": "section_name",
      "content": "explanation_of_what_this_code_does"
    }
  ],
  "summary": "brief_overall_assessment"
}

Code to analyze:
\`\`\`${language || ''}
${code}
\`\`\``;

    try {
      const response = await fetch(GROK_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROK_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'grok-4',
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.1,
          max_tokens: 4000,
        }),
      });

      if (!response.ok) {
        throw new Error(`Grok API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      
      if (!content) {
        throw new Error('No content received from Grok API');
      }

      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format from Grok API');
      }

      const analysis = JSON.parse(jsonMatch[0]);
      
      // Validate the response structure
      if (!analysis.bugs || !analysis.optimizations || !analysis.explanations) {
        throw new Error('Invalid analysis structure from Grok API');
      }

      return analysis;
    } catch (error) {
      console.error('Grok API error:', error);
      throw new Error(`Failed to analyze code: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  async analyzeImage(imageFile: File): Promise<GrokAnalysisResponse> {
    if (!GROK_API_KEY) {
      throw new Error('Grok API key not configured');
    }

    // Convert image to base64
    const base64Image = await this.fileToBase64(imageFile);
    
    const prompt = `Analyze this image containing code and provide a detailed review. Extract the code first, then analyze it for bugs, optimizations, and provide explanations.

Return the analysis in this exact JSON format:
{
  "bugs": [
    {
      "id": "unique_id",
      "line_number": line_number_if_applicable,
      "severity": "low|medium|high|critical",
      "description": "description_of_the_bug",
      "suggestion": "how_to_fix_it"
    }
  ],
  "optimizations": [
    {
      "id": "unique_id",
      "line_number": line_number_if_applicable,
      "type": "performance|readability|security|best_practice",
      "description": "what_can_be_improved",
      "suggestion": "how_to_improve_it",
      "impact": "low|medium|high"
    }
  ],
  "explanations": [
    {
      "id": "unique_id",
      "section": "section_name",
      "content": "explanation_of_what_this_code_does"
    }
  ],
  "summary": "brief_overall_assessment"
}`;

    try {
      const response = await fetch(GROK_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROK_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'grok-4',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: prompt,
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: base64Image,
                  },
                },
              ],
            },
          ],
          temperature: 0.1,
          max_tokens: 4000,
        }),
      });

      if (!response.ok) {
        throw new Error(`Grok API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      
      if (!content) {
        throw new Error('No content received from Grok API');
      }

      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format from Grok API');
      }

      const analysis = JSON.parse(jsonMatch[0]);
      
      // Validate the response structure
      if (!analysis.bugs || !analysis.optimizations || !analysis.explanations) {
        throw new Error('Invalid analysis structure from Grok API');
      }

      return analysis;
    } catch (error) {
      console.error('Grok API error:', error);
      throw new Error(`Failed to analyze image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Remove the data:image/...;base64, prefix
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  },
};
