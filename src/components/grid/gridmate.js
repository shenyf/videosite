import moment from "moment/moment";

export const column_slot_status = {
  xtype: 'badge',
  defaultValue: 'DISABLED',
  format: {
    NORMAL: {
      text: '启用',
      color: 'primary',
    },
    DISABLED: {
      text: '禁用',
      color: 'negative',
    }
  }
}
