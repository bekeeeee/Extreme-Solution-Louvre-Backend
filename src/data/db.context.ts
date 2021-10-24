import { injectable } from 'inversify'
import 'dotenv/config'

import mongoose from 'mongoose'

import { IUser, UserModel, userSchema } from '@data/user/user.model'
import { artsModel, IArt } from './art/arts.model'

@injectable()
export class DBContext {
  private _db: typeof mongoose

   async connect() {
    this._db = await mongoose.connect(process.env.DB_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })

    console.log('connected to DB')
  }



  get user() {
    return this._db.model<IUser, UserModel>('User', userSchema)
  }

  get art() {
    return this._db.model<IArt>('Art', artsModel)
  }
}
