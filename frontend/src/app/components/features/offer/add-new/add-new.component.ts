import { Component, OnInit } from '@angular/core';
import { FuelType } from 'src/app/model/fuelType.model';
import { Location } from 'src/app/model/location.model';
import { Make } from 'src/app/model/make.model';
import { ModelRes } from 'src/app/model/modelRes.model';
import { OfferReq } from 'src/app/model/offerReq.model';
import { Vehicle } from 'src/app/model/vehicle.model';
import { VehicleReq } from 'src/app/model/VehicleReq.model';
import { VehicleRes } from 'src/app/model/vehicleRes.model';
import { VehicleType } from 'src/app/model/vehicleType.model';
import { FuelTypeService } from 'src/app/services/fuel-type.service';
import { LocationService } from 'src/app/services/location.service';
import { MakeService } from 'src/app/services/make.service';
import { ModelService } from 'src/app/services/model.service';
import { OfferService } from 'src/app/services/offer.service';
import { VehicleTypeService } from 'src/app/services/vehicle-type.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {

  regs: string[] = [
    '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000',
    '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011',
    '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'
  ]

  firstReg: string = "1989";

  makes: Make[] = [];
  make: Make = undefined;

  models: ModelRes[] = [];
  model: ModelRes = undefined;

  price: number;

  cc: number;

  hp: number;

  km: number;

  numberOfDors: number;

  vehicleTypes: VehicleType[] = [];
  vehicleType: VehicleType = undefined;

  fuelTypes: FuelType[] = [];
  fuelType: FuelType = undefined;

  locations: Location[] = [];
  location: Location = new Location();

  vehicles: VehicleRes[] = [];
  vehicle: VehicleReq = new VehicleReq();

  description: string = "";

  url: string;

  constructor(
    private makeService: MakeService,
    private modelService: ModelService,
    private vehicleTypeService: VehicleTypeService,
    private fuelTypeService: FuelTypeService,
    private locationService: LocationService,
    private vehicleService: VehicleService,
    private offerService: OfferService,
  ) { }

  ngOnInit(): void {
    this.loadAllVehicles();
    this.loadAllMakes();
    this.loadAllVehicleTypes();
    this.loadAllFuelTypes();
    this.loadAllLocations();
  }
  /*
  ////////////////////////////////////////
  - Sve ono sto sam radio da mi se izbzace odrednjeni tipovi pobrisati
  - sam mogu da biram sve. mogu da stavim da je audi a8 kombi ako hocu
  - napraviti prvo dodavanje vozila pa zatim dodavanje oglasa
  
  
  ////////////////////////////////////////
  */
  /**
   * Take url of choosen image.
   *
   * @param event event file selected
   */
  onSelectFile(event): void {
    if (event.target.files && event.target.files[0]) {
      this.url = event.target.files[0];
    }
  }

  createVehicle() {
    this.vehicle.cubicCapacity = this.cc;
    this.vehicle.firstRegistration = '01-01-'+ this.firstReg;
    this.vehicle.fuelTypeId = this.fuelType.id;
    this.vehicle.kilometer = this.km;
    this.vehicle.modelId = this.model.id;
    this.vehicle.numberOfDoors = this.numberOfDors;
    this.vehicle.power = this.hp;
    this.vehicle.vehicleTypeId = this.vehicleType.id;
  }

  addedVId: number;

  async add() {
    if (!this.validate()) return;

    this.createVehicle();

    // this.vehicles.forEach(v => {
    //   if (v.modelId == this.model.id && v.fuelTypeId == this.fuelType.id && v.vehicleTypeId == this.vehicleType.id) {
    //     vehicleId = v.id;
    //     // return;
    //   }
    // });

    var addedVehicle = await this.vehicleService.post(this.vehicle).toPromise();

    var offerReq: OfferReq = new OfferReq(
      {
        date: this.firstReg + "-01-14T23:00:00.000+00:00",
        description: this.description,
        price: this.price,
        locationId: this.location.id,
        vehicleId: addedVehicle.id
      })

    console.log(offerReq);

    //TODO: Add offer
    await this.offerService.post(offerReq, this.url).toPromise();
    // subscribe(
    //   res => {
    //     console.log("Uspesno smo dodali auto")
    //     console.log(res);

    //   }, err =>{ 
    //     console.log("GRESKA"); 
    //     console.log(err);
    //   }
    // );
  }

  validate(): boolean {
    if (this.make == undefined) return false;
    if (this.model == undefined) return false;
    if (this.price == undefined) return false;
    if (this.price < 0) return false;
    if (this.vehicleType == undefined) return false;
    if (this.fuelType == undefined) return false;
    if (this.km == undefined) return false;
    if (this.km < 0) return false;
    if (this.firstReg == "1989") return false;
    if (this.cc == undefined) return false;
    if (this.cc < 0) return false;
    if (this.hp == undefined) return false;
    if (this.hp <= 0) return false;
    if (this.location.city == undefined) return false;
    if (this.url == undefined) return false;

    return true;
  }

  async loadAllVehicles() {
    this.vehicles = await this.vehicleService.getAll();
  }

  async loadAllLocations() {
    this.locations = await this.locationService.getAll();
  }

  loadAllMakes() {
    this.makeService.getAll(0, 1000).subscribe(
      res => {
        this.makes = res.content;
      }
    )
  }

  async chooseVehicles() {
    // await this.loadAllVehicles();
    // await this.loadAllVehicleTypes();
    // await this.loadAllFuelTypes();

    // await this.filterVehicles();
    // await this.filterVehicleTypes();
    // await this.filterFuelTypes();
  }

  loadModels() {
    this.modelService.getAll(this.make.id).subscribe(
      res => {
        this.models = res;  // ModelRes
      }
    )
  }

  // filterVehicles() {
  //   var i = this.vehicles.length;
  //   console.log(this.models)

  //   while (i--) {
  //     var del = true;

  //     this.models.forEach(m => {
  //       if (m.id == this.vehicles[i].modelId && m.name == this.model.name) del = false;
  //     });

  //     if (del) this.vehicles.splice(i, 1);
  //   }
  //   console.log(this.vehicles)
  // }

  // filterVehicleTypes() {
  //   var i = this.vehicleTypes.length;

  //   while (i--) {
  //     var del = true;

  //     this.vehicles.forEach(v => {
  //       if (v.vehicleTypeId == this.vehicleTypes[i].id) del = false;
  //     });

  //     if (del) this.vehicleTypes.splice(i, 1);
  //   }
  // }

  // filterFuelTypes() {
  //   var i = this.fuelTypes.length;

  //   while (i--) {
  //     var del = true;

  //     this.vehicles.forEach(v => {
  //       if (v.fuelTypeId == this.fuelTypes[i].id) del = false;
  //     });

  //     if (del) this.fuelTypes.splice(i, 1);
  //   }
  // }

  async loadAllVehicleTypes() {
    this.vehicleTypes = await this.vehicleTypeService.getAll().toPromise();
  }

  async loadAllFuelTypes() {
    this.fuelTypes = await this.fuelTypeService.getAll().toPromise();
  }

  clearModels() {
    this.models = [];
    this.model = undefined;
  }

}
