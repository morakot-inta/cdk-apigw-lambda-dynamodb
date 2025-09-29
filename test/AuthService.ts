import { CognitoIdentityProviderClient, InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';
import { createHmac } from 'crypto';

const awsRegion = 'ap-southeast-1';

export class AuthService {
  private client: CognitoIdentityProviderClient;
  private userPoolId: string;
  private clientId: string;
  private clientSecret: string;
  private tokens: any = null;

  constructor() {
    this.client = new CognitoIdentityProviderClient({ region: awsRegion });
    this.userPoolId = 'ap-southeast-1_H3mlDDSRB';
    this.clientId = '6p6as9rt8qq808q9o6updei407';
    this.clientSecret = '1oqqo8e5q5n6d264ca53p57hha4m7o9fq00ek6esicqkberhdsm3'; // Your actual secret
  }

  private calculateSecretHash(username: string): string {
    const message = username + this.clientId;
    const hash = createHmac('sha256', this.clientSecret)
      .update(message)
      .digest('base64');
    return hash;
  }

  public async login(userName: string, password: string) {
    try {
      const secretHash = this.calculateSecretHash(userName);

      const command = new InitiateAuthCommand({
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: this.clientId,
        AuthParameters: {
          USERNAME: userName,
          PASSWORD: password,
          SECRET_HASH: secretHash
        }
      });

      const response = await this.client.send(command);
      
      // Store tokens for later use
      this.tokens = response.AuthenticationResult;
      
      console.log('Login successful');
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  public async getIdToken() {
    if (!this.tokens || !this.tokens.IdToken) {
      throw new Error('No ID token available. Please login first.');
    }
    return this.tokens.IdToken;
  }
}