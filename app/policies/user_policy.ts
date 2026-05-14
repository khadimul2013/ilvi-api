// import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
// import User from '#models/user'
// import { ROLE } from '#helpers/enum'

// export default class UserPolicy extends BasePolicy {
//     /**
//      * Admin/Super Admin can view all users
//      */
//     async viewList(auth: User) {
//         return [ROLE.ADMIN, ROLE.SUPER_ADMIN].includes(auth.role)
//     }

//     /**
//      * Admin/Super Admin or own profile
//      */
//     async view(auth: User, user: User) {
//         return (
//             [ROLE.ADMIN, ROLE.SUPER_ADMIN].includes(auth.role) ||
//             auth.uuid === user.uuid
//         )
//     }

//     /**
//      * Create user
//      */
//     async create(auth: User) {
//         return [ROLE.ADMIN, ROLE.SUPER_ADMIN].includes(auth.role)
//     }

//     /**
//      * Update user
//      */
//     async update(auth: User, user: User) {
//         return (
//             [ROLE.ADMIN, ROLE.SUPER_ADMIN].includes(auth.role) ||
//             auth.uuid === user.uuid
//         )
//     }

//     /**
//      * Delete user
//      */
//     async delete(auth: User, user: User) {
//         return (
//             [ROLE.ADMIN, ROLE.SUPER_ADMIN].includes(auth.role) ||
//             auth.uuid === user.uuid
//         )
//     }

//     /**
//      * Bulk actions
//      */
//     async bulk(auth: User) {
//         return [ROLE.ADMIN, ROLE.SUPER_ADMIN].includes(auth.role)
//     }
// }