// const UserModel = require("../UserModel");
import {UserModel} from "../UserModel";

test('excepts all params', () => {
    const rawData = { 'name': 'abc', email: 'abc@gmail.com', 'mobile': 9323525791, 'isActive': true }
    const user = new UserModel(rawData);
    expect(user.getName()).toBe(rawData.name)
    expect(user.getEmail()).toBe(rawData.email)
    expect(user.getMobile()).toBe(rawData.mobile)
    expect(user.getIsActive()).toBe(rawData.isActive)
    expect(user.getData()).toEqual(rawData)
})
