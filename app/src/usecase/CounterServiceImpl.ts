import { CounterService } from './CounterService'
import { RestClient } from '../adapter/RestClient'
import { CounterItem } from '../entity/CounterItem'

export class CounterServiceImpl implements CounterService {
  client: RestClient

  constructor(client: RestClient) {
    this.client = client
  }

  async getCounter(): Promise<CounterItem> {
    const counters: any = await this.client.getCounter()

    const items = []

    for (const counter of counters) {
      items.push(CounterItem.fromJSON(counter))
    }

    return items[0]
  }

  async increment(): Promise<CounterItem | null> {
    const currentCounterItem = await this.getCounter()
    const counterItem: any = await this.client.updateCounter(
      currentCounterItem.counter + 1
    )

    return CounterItem.fromJSON(counterItem)
  }
}
