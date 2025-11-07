'use server';

/**
 * @fileOverview An AI agent that converts JSON to other data formats.
 *
 * - convertFormat - A function that converts a JSON string to a specified format.
 * - ConvertFormatInput - The input type for the convertFormat function.
 * - ConvertFormatOutput - The return type for the convertFormat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import * as yaml from 'js-yaml';


const ConvertFormatInputSchema = z.object({
  jsonString: z.string().describe('The JSON string to convert.'),
  targetFormat: z.enum(['yaml', 'xml', 'toml']).describe('The target format for conversion.'),
});
export type ConvertFormatInput = z.infer<typeof ConvertFormatInputSchema>;

const ConvertFormatOutputSchema = z.object({
  convertedString: z.string().describe('The resulting string in the target format.'),
});
export type ConvertFormatOutput = z.infer<typeof ConvertFormatOutputSchema>;


export async function convertFormat(input: ConvertFormatInput): Promise<ConvertFormatOutput> {
  if (input.targetFormat === 'yaml') {
    try {
        const jsonObject = JSON.parse(input.jsonString);
        const yamlString = yaml.dump(jsonObject);
        return { convertedString: yamlString };
    } catch (e: any) {
        console.error("Error converting to YAML", e);
        throw new Error("Failed to convert to YAML: " + e.message);
    }
  }
  // For XML and TOML, we will use the AI flow.
  return convertFormatFlow(input);
}


const convertFormatPrompt = ai.definePrompt({
  name: 'convertFormatPrompt',
  input: { schema: ConvertFormatInputSchema },
  output: { schema: ConvertFormatOutputSchema },
  prompt: `You are a data format converter. Convert the following JSON string to the specified target format.
Return only the converted string in the 'convertedString' field. Do not include any explanations or markdown formatting.

JSON Input:
\`\`\`json
{{{jsonString}}}
\`\`\`

Target Format: {{{targetFormat}}}
`,
});

const convertFormatFlow = ai.defineFlow(
  {
    name: 'convertFormatFlow',
    inputSchema: ConvertFormatInputSchema,
    outputSchema: ConvertFormatOutputSchema,
  },
  async input => {
    const { output } = await convertFormatPrompt(input);
    return output!;
  }
);
