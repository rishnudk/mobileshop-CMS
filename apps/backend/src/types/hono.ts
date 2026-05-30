// Hono context variables type — shared across middleware and controllers
export type HonoVariables = {
  user: {
    id: string;
    email: string;
    role: string;
  };
};
