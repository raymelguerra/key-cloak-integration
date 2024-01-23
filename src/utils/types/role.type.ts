export type RoleRepresentation = {
    id?: string;
    name?: string;
    description?: string;
    scopeParamRequired?: boolean;
    composite?: boolean;
    composites?: any;
    clientRole?: boolean;
    containerId?: string;
    attributes?: Record<string, string[]> | null;
  };

  