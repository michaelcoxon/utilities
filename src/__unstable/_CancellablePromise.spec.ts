// import assert from 'assert';
// import CancellablePromise from './_CancellablePromise';
// import delay from '../Promises/delay';



// describe("CancellablePromise.construct", () =>
// {
//     it("should construct (default)", async () =>
//     {
//         let storage = 0;

//         const promise = new CancellablePromise<number>((async () =>
//         {
//             await delay(1000);
//             return storage = 1;
//         })());

//         promise.cancel();

//         try
//         {
//             await delay(1000);
//         }
//         catch (e)
//         {
//             expect(promise.cancelled).toBe(true);
//             expect(storage).toBe(0);
//             return;
//         }
//         assert.fail();
//     });
// });    
export default null;