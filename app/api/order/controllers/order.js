'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const stripe = require('stripe')('sk_test_51L7W89JIrxSQKjakzpMfm92vcUI6wue3TUZkIoEAT9Vw4hmvCAmoqkdYsUVa5JlDwPKTbXsFNROYvdhcxDc7FK5x007NdbmJF5');

module.exports = {
  // 注文を作成する
  create: async (ctx) => {
    const { address, amount, dishes, token } = JSON.parse(ctx.request.body)
    const charge = await stripe.charges.create({
      amount: amount,
      currency: 'jpy',
      source: token,
      description: `Order ${new Date()} by ${ctx.state.user._id}`,
    });

    const order = await strapi.services.order.create({
      user: ctx.state.user._id,
      charge_id: charge.id,
      amount: amount,
      address,
      dishes
    })

    return order
  }
};
