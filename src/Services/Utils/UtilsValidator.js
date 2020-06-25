const { UtilsValidationError } = require('./UtilsErrors');
const referenceDataTypes = require('../../reference-data-types');
const referenceDataSearchTypes = require('../../reference-data-search-types');

function Validator(params) {
  this.params = params;
  this.reg = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
}

Validator.prototype.end = function () {
  return this.params;
};

Validator.prototype.currencies = function () {
  if (Object.prototype.toString.call(this.params.currencies) !== '[object Array]') {
    throw new UtilsValidationError.CurrenciesMissing(this.params);
  }

  if (this.params.currencies.length <= 0) {
    throw new UtilsValidationError.CurrenciesMissing(this.params);
  }

  this.params.currencies.forEach((currency) => {
    if (!currency.from || !currency.to) {
      throw new UtilsValidationError.CurrenciesMissing(this.params);
    }
  });

  return this;
};

function referenceDataCheck(params, validItems){
  if (Object.prototype.toString.call(params.dataType) !== '[object String]') {
    throw new UtilsValidationError.DataTypeMissing(params);
  }

  if (params.dataType.length <= 0) {
    throw new UtilsValidationError.DataTypeMissing(params);
  }

  if (!validItems.includes(params.dataType)) {
    throw new UtilsValidationError.DataTypeMissing(params);
  }
}

Validator.prototype.datatype = function () {
  referenceDataCheck(this.params, referenceDataTypes);

  return this;
};

Validator.prototype.dataSearchtype = function () {
  referenceDataCheck(this.params, referenceDataSearchTypes);

  return this;
};


module.exports = {
  CURRENCY_CONVERSION(params) {
    return new Validator(params)
      .currencies()
      .end();
  },
  REFERENCE_DATATYPE(params) {
    return new Validator(params)
      .datatype()
      .end();
  },
  REFERENCE_DATASEARCHTYPE(params) {
    return new Validator(params)
      .dataSearchtype()
      .end();
  },
};
