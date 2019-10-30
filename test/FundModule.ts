import { CompoundModuleInstance, FundsModuleInstance, PoolContract, PoolInstance } from "../types/truffle-contracts/index";
// tslint:disable-next-line:no-var-requires
const { BN, constants, expectEvent, shouldFail } = require("@openzeppelin/test-helpers");
// tslint:disable-next-line:no-var-requires
const should = require("chai").should();

const Pool = artifacts.require("Pool");

const FundsModule = artifacts.require("FundsModule");

const CompoundModule = artifacts.require("CompoundModule");

contract("FundsModule", async ([_, owner, ...otherAccounts]) => {
    let pool: PoolInstance;
    let funds: FundsModuleInstance; 
    let compound: CompoundModuleInstance;
  
    beforeEach(async () => {
        pool = await Pool.new();
        await pool.initialize();

        funds = await FundsModule.new();
        await funds.initialize({ from: owner });
    });
  
    it("should set module to pool", async () => {
        await pool.set("funds", funds.address, true);  
        (await pool.contains(funds.address)).should.equal(true);
    });
  
    it("should get next module", async () => {
        compound = await CompoundModule.new();
        await compound.initialize({ from: owner });  
        await pool.set("funds", funds.address, true); 
        
        await pool.set("compound", compound.address, true);
        (await pool.next(funds.address)).should.equal(compound.address);
    });
});