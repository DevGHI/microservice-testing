/**
 * All API urls and other constants will reside here.
 * It is always a good idea to keep a local copy of all API response to
 * keep your app working for UI changes and
 * make it independent of network requirements.
 *
 * They need to be categorised and grouped together as:
 *  - Actual endpoints url.
 *  - Local data .json file path.
 * At a moment only one group should be uncommented.
 *
 * Other way to deal with this is to name every json file as per your service endpoint and use a basepath variable.
 * Toggle this basePath variable between "actual-domain.com/" or "/data/".
 */

// Actual endpoints. Uncomment below section to use actual data.
// export const GET_ALL_USERS = () => `https://jsonplaceholder.typicode.com/users`;
// export const GET_USER_DETAILS = (id) => `https://jsonplaceholder.typicode.com/users/${id}`;

// Local endpoints. Uncomment below section to use dummy local data.
let domain = process.env.REACT_APP_API_URL;
console.log("domain=", domain);

export const GAMES_API = `${domain}api/dashboard/games`;
export const GAME_DETAIL_API = (id) => `${domain}api/dashboard/games/${id}`;
export const REGION_API = `${domain}api/regions`;
//user
export const WITHDRAW_API = `${domain}api/withdraws`;
export const USERS_API = `${domain}api/users`;
export const UNIT_UPDATE_API = (id) => `${domain}api/dashboard/games/update-price/${id}`;
export const GAME_UPDATE_API = (id) => `${domain}api/dashboard/games/update/${id}`;
//user
export const ORDER_API = `${domain}api/orders`;
export const CHANGE_ORDER_STATUS_API = `${domain}api/orders/update/status`;

//deposit
export const DEPOSIT_API = `${domain}api/deposits`;
export const REJECT_DEPOSIT_API = (id) => `${domain}api/deposit-reject/${id}`;
export const CONFIRM_DEPOSIT_API = (id) => `${domain}api/deposit-confirm/${id}`;

//payment
export const PAYMENT_PROVIDER_API = `${domain}api/payment-providers`;
export const CREATE_PAYMENT_PROVIDER_API = `${domain}api/payment-providers`;
export const UPDATE_PAYMENT_PROVIDER_API = (id) => `${domain}api/payment-providers/${id}`;

export const PAYMENT_ACCOUNT_API = `${domain}api/payment-accounts`;
export const DELETE_PAYMENT_ACCOUNT_API = (id) => `${domain}api/payment-accounts/${id}`;
export const UPDATE_PAYMENT_ACCOUNT_API = (id) => `${domain}api/payment-accounts/${id}`;
export const CREATE_PAYMENT_ACCOUNT_API = `${domain}api/payment-accounts`;

//announcement
export const ANNOUNCEMENT_API = `${domain}api/announcements`;
export const UPDATE_ANNOUNCEMENT_API = (id) => `${domain}api/announcements/${id}`;
export const DELETE_ANNOUNCEMENT_API = (id) => `${domain}api/announcements/${id}`;

//app-guide
export const APP_GUIDE_API = `${domain}api/app-guides`;
export const UPDATE_APP_GUIDE_API = (id) => `${domain}api/app-guides/${id}`;
export const DELETE_APP_GUIDE_API = (id) => `${domain}api/app-guides/${id}`;

//post
export const POST_API = `${domain}api/posts`;
export const UPDATE_POST_API = (id) => `${domain}api/posts/${id}`;
export const DELETE_POST_API = (id) => `${domain}api/posts/${id}`;

//categories
export const CATEGORY_API = `${domain}api/categories?category_type=main`;
export const SUB_CATEGORY_API = (id) => `${domain}api/categories?parent_id=${id}&category_type=sub`;

//banner image
export const BANNER_IMAGE_API = `${domain}api/banner-images`;
export const DELETE_BANNER_IMAGE_API = (id) => `${domain}api/banner-images/${id}`;

//regions
export const REGIONS_API = `${domain}api/regions`;
export const UPDATE_REGIONS_API = (id) => `${domain}api/regions/${id}`;
export const DELETE_REGIONS_API = (id) => `${domain}api/regions/${id}`;

// transaction
export const TRANSACTION_API = `${domain}api/balance-transaction-histories`;

//user
export const USER_CHANGE_PASSWORD_API = `${domain}api/reset-password`;
export const USER_BAN_WITH_TIME_API = `${domain}api/users/ban-with-banned-till`;
export const USER_UPDATE_API = (id) => `${domain}api/users/${id}`;

//transaction title
export const TRANSACTION_TITLE_API = `${domain}api/transaction-titles`;

