'use server';

/**
 * @fileOverview An AI agent that explains JSON syntax errors and suggests fixes.
 *
 * - explainJsonError - A function that explains JSON syntax errors.
 * - ExplainJsonErrorInput - The input type for the explainJsonError function.
 * - ExplainJsonErrorOutput - The return type for the explainJsonError function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainJsonErrorInputSchema = z.object({
  jsonString: z.string().describe('The JSON string to validate and explain errors for.'),
  errorMessage: z.string().describe('The error message associated with the JSON string.'),
});
export type ExplainJsonErrorInput = z.infer<typeof ExplainJsonErrorInputSchema>;

const ExplainJsonErrorOutputSchema = z.object({
  explanation: z.string().describe('The explanation of the JSON syntax error.'),
  suggestedFix: z.string().describe('The suggested fix for the JSON syntax error.'),
});
export type ExplainJsonErrorOutput = z.infer<typeof ExplainJsonErrorOutputSchema>;

export async function explainJsonError(input: ExplainJsonErrorInput): Promise<ExplainJsonErrorOutput> {
  return explainJsonErrorFlow(input);
}

const explainJsonErrorPrompt = ai.definePrompt({
  name: 'explainJsonErrorPrompt',
  input: {schema: ExplainJsonErrorInputSchema},
  output: {schema: ExplainJsonErrorOutputSchema},
  prompt: `You are a helpful assistant that explains JSON syntax errors and suggests fixes.
  The JSON string is: {{{jsonString}}}
  The error message is: {{{errorMessage}}}
  Explain the error and suggest a fix.
  Be concise and use technical terms.
  Respond in the following format:
  {
    "explanation": "explanation of the error",
    "suggestedFix": "suggested fix for the error"
  }`,
});

const explainJsonErrorFlow = ai.defineFlow(
  {
    name: 'explainJsonErrorFlow',
    inputSchema: ExplainJsonErrorInputSchema,
    outputSchema: ExplainJsonErrorOutputSchema,
  },
  async input => {
    const {output} = await explainJsonErrorPrompt(input);
    return output!;
  }
);
