import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Record } from 'src/app/state/records/records.model';
import { RecordsState } from 'src/app/state/records/records.reducer';
import { selectAllRecords, selectRecord } from 'src/app/state';
import { CreateRecord, SelectRecord } from 'src/app/state/records/records.actions';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit, OnDestroy {

  records$: Observable<Record[]>;
  selectedRecord: Record;
  recordName: string = null;
  createPopup = false;
  sub: Subscription;

  constructor(
    private titleService: Title,
    private store: Store<RecordsState>
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Get started | Shopping List');
    this.records$ = this.store.pipe(select(selectAllRecords));
    this.sub = this.store
      .pipe(select(selectRecord))
      .subscribe(rec => this.selectedRecord = rec);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  closePopup(e: Event) {
    if (e.target !== e.currentTarget) return;
    this.createPopup = false;
  }

  addSelectedClass(id: string) {
    if (!this.selectedRecord) return;
    return this.selectedRecord.id === id;
  }

  selectRecord(record: Record) {
    this.store.dispatch(new SelectRecord(record));
  }

  createRecord() {
    const newRecord: Record = {
      name: this.recordName,
      createDate: Date.now(),
      shoppingList: null
    }

    this.store.dispatch(new CreateRecord(newRecord));
    this.recordName = null;
    this.createPopup = false;
  }

}
