export interface GrokMessage {
    role: 'user' | 'assistant';
    content: string;
  }
  
  export interface GrokResponse {
    choices: {
      message: GrokMessage;
    }[];
  }