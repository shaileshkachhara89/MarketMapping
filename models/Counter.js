const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const counterSchema = new Schema({
    emp_name: { type: String, required: true },
    emp_code: { type: String, required: true },
    emp_email: { type: String, required: true },
    emp_phone: { type: String, required: true },
    counter_name: { type: String, required: true },
    counter_type: { type: String, required: true },
    counter_owner_name: { type: String, required: true },
    counter_phone: { type: String, required: true },
    counter_brand : { type: String, required: true },
    brand_avg_volume : { type: String, required: true },
    counter_location: { type: String, required: true },
    counter_geo_tag: { type: String, required: true },
    counter_manpower:{type: String, required: true},
    counter_truck : {type : String, required: true},
    counter_main_road: {type : String, required: true},
    counter_painting: {type : String, required: true},
    counter_credit_days_ihb: {type : String, required: true},
    counter_credit_days_retail: {type : String, required: true},
    counter_influencers_no: {type : String, required: true},
    counter_age: {type : String, required: true},
    counter_plan_next_gen: {type : String, required: true},
}, {
    timestamps: true,
    collection: 'counters'
});

module.exports = mongoose.model('Counter', counterSchema);