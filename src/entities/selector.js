// Entities
import { TABLESPACES_ENTITY_ID, TABLESPACES_ENTITY_HUMAN } from './tablespaces';

export const getHumanEntityName = (entity: string): string => {
  switch (entity) {
    case TABLESPACES_ENTITY_ID:
      return TABLESPACES_ENTITY_HUMAN;
    default:
      return false;
  }
}
