import {Dummy} from '@prisma/client';
import { DummyResponse } from '@responses/DummyResponse';

class DummyPresenter {
  public execute(dummy: Dummy) {
    console.log(dummy);
    return new DummyResponse(dummy.name);
  }
}
export default new DummyPresenter();
