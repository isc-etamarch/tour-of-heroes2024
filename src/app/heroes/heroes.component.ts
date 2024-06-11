import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from "@angular/material/paginator";
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '@intersystems/confirmation-dialog';
import { TopbarControlService } from '@intersystems/header';
import { FormModes, IscFormModalComponent, IscFormModalData } from '@intersystems/isc-form';
import { TableConfig, PaginatorConfig, EPresetOptions } from '@intersystems/table';
import { Observable } from 'rxjs'

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { SecretCellComponent } from './../secret-cell/secret-cell.component';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];


  launchAddModal(): void {
    const addHeroModal: IscFormModalData = {
      modalTitle: 'Add Hero',
      iscFormInputs: {
        Id: 'addModal',
        FDN: {
          name: '',
          description: '',
          validateOn: 'change',
          sectionLayout: { showSectionHeaders: false },
          sections: [
            {
              fields: [
                {
                  key: 'name',
                  type: 'input',
                  id: 'name',
                  templateOptions: {
                    label: 'Add Hero',
                    required: true,
                    placeholder: 'Input Hero Name',
              }
            }
            ]
          }]
        },
        formModel: {
          addHero: '',
        },
        mode: FormModes.EDIT,
        formConfig: {},
        buttons: [
          {
            text: 'Add',
            buttonClass: 'primary',
            id: 'add',
            disabledIfFormInvalid: true,
            callback: (clickEvent: any, button: any, formModel: any, formOptions: any, form: any) => {
              this.add(formModel.name);
              dialogRef.close()
            }
          },
          {
            text: 'Cancel',
            buttonClass: 'tertiary',
            id: 'cancel',
            callback: () => {
              dialogRef.close()
            }
          }
        ]
      }
    }

    const dialogRef: MatDialogRef<any, any> = this.dialog.open(IscFormModalComponent, {
      panelClass: "isc-form-modal", // don't forget the panelClass
      data: addHeroModal
    });
  }

  tableConfig: TableConfig = {
    key: 'heroes-table',
    header: {
      title: "Heroes",
      newButton: {
        id: "hero-table-header-id",
        text: "New Hero",
        tooltip: "Click here to add new hero.",
        onClick: (event: any) => {
          this.launchAddModal()
        },
      },
      titleTooltip: {
        text: "Heroes table"
      }
    },
    columns: [
      {
        sortable: true,
        title: "ID",
        key: "id",
        cellDisplay: {
          getDisplay: (row: any, col: any) => {
            return row.id;
          }
        }
      },
      {
        sortable: true,
        title: "Name",
        key: "name",
        cellDisplay: {
          getDisplay: (row: any, col: any) => {
            return row.name;
          }
        }
      },
      {
        title: "Weakness",
        key: 'weakness',
        cellDisplay: {
          component: SecretCellComponent
        }
      },
      {
        title: "Actions",
        key: "actionsIcons",
        cellDisplay: {
          preset: EPresetOptions.ACTIONS_ICONS,
          actionsIcons: {
            iconsOrder: ["edit","delete"],
            edit: {
              tooltip: {
                text: "Edit Hero"
              },
              callback: (event: any, row: any, col: any, rowIndex: number, paginator: MatPaginator) => {
                this.router.navigate(['detail', row.id]);
              }
            },
            delete: {
              tooltip: {
                text: "Delete Hero"
              },
              callback: (event: any, row: any, col: any, rowIndex: number, paginator: MatPaginator) => {
                this.delete(row)
              }
            }
          },

        }
      }
    ],
    useSearch: true,
    searchConfig: {},
    sort: {
      asyncSortFunction: (event: any, data: any) => {
        let sortedData = data.sort((a: any, b: any) => {
          const isAsc = event.direction === "asc";
          switch (event.active) {
            case 'id':
            case 'name':
              if (a[event.active] > b[event.active]) {
                return isAsc ? 1 : -1;
              } else {
                return isAsc ? -1 : 1;
              }
            default:
              return 0
          }
        });
        const sortAsyncObservable = new Observable((observer) => {
          setTimeout(() => {
            observer.next(sortedData);
          }, 1000);
        })
        return sortAsyncObservable;
      }
    }
  };
  paginatorConfig: PaginatorConfig = {
    pageSize: 5
  };

  constructor(
    private heroService: HeroService,
    private dialog: MatDialog,
    private topbarControlService: TopbarControlService,
    private router: Router
    ) { }

  ngOnInit() {
    this.getHeroes();
    this.topbarControlService.setPageTitle('Heroes');
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero)
        const newHeroes = Object.assign([], this.heroes);
        this.heroes = newHeroes;
      });
  }

  delete(hero: Hero): void {
    let dialogConfig = {
      panelClass: 'fr-layout-wrapper-mat-dialog-panel',
      autoFocus: false,
      data: {
        title: "Delete Hero",
        primary: `Are you sure you want to delete ${hero.name}?`,
        buttons: {
          primary: {
            text: "Delete"
          },
          secondary: {
            text: "Cancel"
          }
        }
      }
    }

    const dialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.button) {
        switch (result.button) {
          case 'primary':
            this.heroes = this.heroes.filter(h => h !== hero);
            this.heroService.deleteHero(hero.id).subscribe();
            break;
          case 'secondary':
            break;
        }
      }
    })
  }

}
