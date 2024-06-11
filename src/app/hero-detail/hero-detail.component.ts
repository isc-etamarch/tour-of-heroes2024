import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { FormButton, FDN, FormModes } from '@intersystems/isc-form';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;

  formModes = FormModes;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  profileFDN: FDN = {
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
            overrideValidatorMessage: {
              "isc-required": 'Name is a required field'
            },
            templateOptions: {
              required: true,
              label: 'Hero Name',
            }
          },
          {
            key: 'weakness',
            type: 'input',
            id: 'weakness',
            templateOptions: {
              label: 'Super Secret Weakness'
            }
          }
        ]}
      ]
    }

  profileFormData = {
    name: '',
    weakness: '',
  };

  profileButtons: FormButton[] = [
    {
      text: 'Save',
      buttonClass: 'primary',
      id: 'save',
      disabled: (formModel: any, formOptions: any, form: any) => {
        return !form.valid;
      },
      callback: (clickEvent: any, button: any, formModel: any, formOptions: any, form: any) =>{
        this.save(formModel);
      }
    }
  ]
  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = hero
        this.profileFormData.name = this.hero.name
      this.profileFormData.weakness = this.hero.weakness
      });
  }

  goBack(): void {
    this.location.back();
  }

  save(newHero): void {
    if (this.hero) {
      this.hero.name = newHero.name
      this.hero.weakness = newHero.weakness
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }
}
