export type UserProfile = {
  self?: string | null; // String
  id?: string | null; // String
  origin?: string | null; // String
  createdTimestamp?: number | null; // Long (int64)
  username?: string | null; // String
  enabled?: boolean | null; // Boolean
  totp?: boolean | null; // Boolean
  emailVerified?: boolean | null; // Boolean
  firstName?: string | null; // String
  lastName?: string | null; // String
  email?: string | null; // String
  federationLink?: string | null; // String
  serviceAccountClientId?: string | null; // String
  attributes?: Record<string, string[]> | null; // Map of [array]
  credentials?: [] | null; // List of CredentialRepresentation
  disableableCredentialTypes?: Set<string> | null; // Set of [string]
  requiredActions?: string[] | null; // List of [string]
  federatedIdentities?: [] | null; // List of FederatedIdentityRepresentation
  realmRoles?: string[] | null; // List of [string]
  clientRoles?: Record<string, string[]> | null; // Map of [array]
  clientConsents?: [] | null; // List of UserConsentRepresentation
  notBefore?: number | null; // Integer (int32)
  applicationRoles?: Record<string, string[]> | null; // Map of [array]
  socialLinks?: [] | null; // List of SocialLinkRepresentation
  groups?: string[] | null; // List of [string]
  access?: Record<string, boolean> | null; // Map of [boolean]
  userProfileMetadata?: null; // UserProfileMetadata
};
