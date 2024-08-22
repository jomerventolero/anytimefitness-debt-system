import readXlsxFile from 'read-excel-file/node'
import fs  from 'fs'

const schema = {
  'Surname': {
    prop: 'surname',
    type: String
  },
  'First Name': {
    prop: 'firstName',
    type: String
  },
  'Member No.': {
    prop: 'memberNo',
    type: String
  },
  'Joined On': {
    prop: 'joinedOn',
    type: Date
  },
  'Mobile Telephone': {
    prop: 'mobileTelephone',
    type: String
  },
  'Membership': {
    prop: 'memmbership',
    type: String
  },
  'Expire/Term': {
    prop: 'expireTerm',
    type: String
  },
  'Last Visit': {
    prop: 'lastVisit',
    type: Date
  },
  'Due On': {
    prop: 'dueOn',
    type: Date
  },
  'Admin Fees Due': {
    prop: 'adminFeesDue',
    type: Float32Array
  },
  'Membership Fees Due': {
    prop: 'membershipFeesDue',
    type: Float32Array
  },
  'Total Fees Due': {
    prop: 'totalFeesDue',
    type: Float32Array    
  }
}


