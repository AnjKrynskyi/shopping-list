import { Record } from "./records.model";
import { RecordsActions, RecordsActionTypes } from './records.actions';

export const initialRecord: Record = {
  name: 'New list',
  createDate: Date.now(),
  shoppingList: null
}

export interface RecordsState {
  records: Record[] | null,
  selectedRecord: Record | null
}

export const initialState: RecordsState = {
  records: [],
  selectedRecord: null
}

const createRecord = (records: Record[], record: Record) => [...records, record];
const updateRecord = (records: Record[], record: Record) => records
  .map(rec => rec.id === record.id ? Object.assign({}, record) : rec);
const deleteRecord = (records: Record[], record: Record) => records.filter(rec => rec.id !== record.id);

export function recordsReducer(state = initialState, action: RecordsActions): RecordsState {
  switch (action.type) {
    case RecordsActionTypes.recordCreated:
      return {
        records: createRecord(state.records, action.payload),
        selectedRecord: action.payload
      }

    case RecordsActionTypes.recordUpdated:
      return {
        records: updateRecord(state.records, action.payload),
        selectedRecord: action.payload
      }

    case RecordsActionTypes.recordsLoaded:
      return {
        records: action.payload,
        selectedRecord: action.payload[0]
      }

    case RecordsActionTypes.selectRecord:
      return {
        records: state.records,
        selectedRecord: action.payload
      }

    case RecordsActionTypes.deleteRecord:
      return {
        records: deleteRecord(state.records, action.payload),
        selectedRecord: state.records[0]
      }

    default:
      return state;
  }
}

/*
 * SELECTORS
*/

export const getAllRecords = (state: RecordsState) => state.records;
export const getSelectedRecord = (state: RecordsState) => state.selectedRecord;
