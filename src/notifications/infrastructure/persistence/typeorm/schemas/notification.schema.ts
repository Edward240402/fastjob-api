/*import { EntitySchemaColumnOptions } from 'typeorm';
import { EntitySchema } from 'typeorm';
export const NotificationSchema = new EntitySchema({
  name: 'Notification',
  target: Notification,
  tableName: 'Notifications',
  columns: {
    id: {
      type: 'bigint',
      primary: true,
      generated: true,
      unsigned: true,
    },
    idContractor: {
      type: Number,
      name: 'contractor',
      length: 3,
    },

    idEmployee: {
      type: Number,
      name: 'employee',
      length: 3,
    },

  },
  uniques: [
    {
      name: 'UQ_people_type_tax_identity',
      columns: ['type', 'taxIdentity'],
    },
  ],
});*/
