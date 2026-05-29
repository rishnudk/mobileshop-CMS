import { CreatePartyInput } from "@mobileshop/shared";
import { PartyRepository } from "./party.repository";

export class PartyService {
  private partyRepository = new PartyRepository();

  async getParties() {
    return this.partyRepository.findMany();
  }

  async getPartyById(id: string) {
    const party = await this.partyRepository.findById(id);
    if (!party) {
      throw new Error("Party not found");
    }

    return party;
  }

  async createParty(input: CreatePartyInput) {
    return this.partyRepository.create({
      type: input.type,
      name: input.name,
      phone: input.phone,
      alternatePhone: input.alternatePhone ?? null,
      address: input.address ?? null,
      contactPerson: input.contactPerson ?? null,
    });
  }
}
