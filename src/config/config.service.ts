import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';
import { join } from 'path';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(join(__dirname, filePath)));
    const localConfig = dotenv.parse(
      fs.readFileSync(join(__dirname, '.env.local')),
    );
    this.envConfig = this.validateInput({ ...localConfig, ...config });
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test', 'local'])
        .default('development'),
      PORT: Joi.number().default(3000),
      DOMAIN_NAME: Joi.string(),
      UNSPLASH_ACCESS_KEY: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get nodeEnv() {
    return this.envConfig.NODE_ENV;
  }

  get port(): number {
    return Number.parseInt(this.envConfig.PORT, 10);
  }

  get unsplashAccessKey() {
    return this.envConfig.UNSPLASH_ACCESS_KEY;
  }

  get domainName() {
    return this.envConfig.DOMAIN_NAME;
  }
}
