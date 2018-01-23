export class SpellMetaData {
  known = false
  preparedUses = 0
  remainingUses = 0
  constructor(
    known = false,
    preparedUses = 0,
    remainingUses = 0) {
      this.known = known;
      this.preparedUses = preparedUses;
      this.remainingUses = remainingUses;
    }
}