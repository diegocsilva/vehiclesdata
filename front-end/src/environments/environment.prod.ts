const api = 'http://ec2-52-67-214-31.sa-east-1.compute.amazonaws.com:8080';

export const environment = {
  production: false,
  vehicle: {
    save: api + '/vehicles',
    edit: api + '/vehicles',
    delete: api + '/vehicles',
    list: api + '/vehicles',
    get: api + '/vehicles',
    filter: api + '/vehicles/filter',
  },
  vehicleType: {
    save: api + '/vehicles-types',
    edit: api + '/vehicles-types',
    delete: api + '/vehicles-types',
    list: api + '/vehicles-types',
    get: api + '/vehicles-types',
    filter: api + '/vehicles-types/filter',
  }
};
