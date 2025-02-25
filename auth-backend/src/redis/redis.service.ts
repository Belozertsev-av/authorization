import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common"
import { createClient, RedisClientType } from "redis"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType

  constructor(private readonly configService: ConfigService) {
    this.client = createClient({
      url: configService.get<string>("REDIS_URL"),
    })
  }

  async onModuleInit() {
    await this.client.connect()
  }

  async onModuleDestroy() {
    await this.client.disconnect()
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    try {
      await this.client.set(key, value, { EX: ttl }) // Атомарная установка TTL
    } catch (error) {
      throw new Error(`Redis set failed: ${error.message}`)
    }
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key)
  }

  async del(key: string): Promise<void> {
    await this.client.del(key)
  }
}
