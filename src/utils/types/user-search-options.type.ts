export type UserSearchOptions = {
  briefRepresentation?: boolean; // Boolean which defines whether brief representations are returned (default: false)
  email?: string | null; // A String contained in email, or the complete email, if param "exact" is true
  emailVerified?: boolean | null; // Whether the email has been verified
  enabled?: boolean | null; // Boolean representing if the user is enabled or not
  exact?: boolean | null; // Boolean which defines whether the params "last", "first", "email", and "username" must match exactly
  first?: number | null; // Pagination offset
  firstName?: string | null; // A String contained in firstName, or the complete firstName, if param "exact" is true
  idpAlias?: string | null; // The alias of an Identity Provider linked to the user
  idpUserId?: string | null; // The userId at an Identity Provider linked to the user
  lastName?: string | null; // A String contained in lastName, or the complete lastName, if param "exact" is true
  max?: number | null; // Maximum results size (defaults to 100)
  q?: string | null; // A query to search for custom attributes, in the format 'key1:value2 key2:value2'
  search?: string | null; // A String contained in username, first or last name, or email. Default search behavior is prefix-based (e.g., foo or foo*). Use foo for infix search and "foo" for exact search.
  username?: string | null; // Username
};
