import Vue from 'vue';
import VueRouter from 'vue-router';

import RouteHandler from '../../RouteHandler.vue';
import TopForm from './TopForm.vue';

Vue.use(VueRouter);

function createBaseFormState(queryParams) {
  const baseState = {
    stripeEmail: '',
    customerId: '',
    first_name: '',
    last_name: '',
    description: 'The Texas Tribune Membership',
    reason: '',
    zipcode: '',
    installments: 'None',
    pay_fees_value: 'False',
  };

  let openEndedStatus;
  let { amount, installmentPeriod = 'monthly' } = queryParams;
  const { campaignId = '' } = queryParams;

  switch (installmentPeriod.toLowerCase()) {
    case 'monthly':
      openEndedStatus = 'Open';
      amount = amount || '10';
      break;
    case 'yearly':
      openEndedStatus = 'Open';
      amount = amount || '75';
      break;
    case 'once':
      openEndedStatus = 'None';
      installmentPeriod = 'None';
      amount = amount || '60';
      break;
    default:
      installmentPeriod = 'monthly';
      openEndedStatus = 'Open';
      amount = amount || '10';
  }

  return {
    ...baseState,
    amount,
    campaign_id: campaignId,
    installment_period: installmentPeriod,
    openended_status: openEndedStatus,
  };
}

function createRouter() {
  return new VueRouter({
    base: '/donate',
    mode: 'history',
    routes: [
      { path: '/', component: RouteHandler },
    ],
  });
}

function bindRouterEvents(router, routeHandler, store) {
  router.onReady(() => {
    const topForm = new Vue({ ...TopForm, store });
    const { currentRoute: { query } } = router;

    store.dispatch(
      'baseForm/createInitialState',
      createBaseFormState(query),
    );

    routeHandler.$mount('#app');
    topForm.$mount('#top-form');
  });
}

export { createRouter, bindRouterEvents };