import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-secret-cell',
  templateUrl: './secret-cell.component.html',
  styleUrls: ['./secret-cell.component.scss']
})
export class SecretCellComponent implements OnInit {
  @Input() column: any;
  @Input() row: any;
  @Input() rowIndex: number;

  secret: string;

  loading = false;

  constructor() { }

  ngOnInit(): void {
  }

  show() {
    this.loading = true;
    setTimeout(() => {
      this.secret = this.row[this.column.key] ? this.row[this.column.key] : 'none';
      this.loading = false;
    }, 1000);
  }

  hide() {
    this.secret = undefined;
  }

}
