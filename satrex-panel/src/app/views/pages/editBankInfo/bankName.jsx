import agribank from '../../../../images/selectedbank/agribank.png';
import industrymine from '../../../../images/selectedbank/bank of industrymine.png';
import ansar from '../../../../images/selectedbank/bank-ansar.png';
import maskan from '../../../../images/selectedbank/bank_makan.png';
import meli from '../../../../images/selectedbank/bank meli.png';
import saderat from '../../../../images/selectedbank/bank_saderat.png';
import sepah from '../../../../images/selectedbank/bankـsepah.png';
import karAfarin from '../../../../images/selectedbank/bankKarAfarin.png';
import enbank from '../../../../images/selectedbank/enbank.png';
import parsian from '../../../../images/selectedbank/parsian.png';
import saman from '../../../../images/selectedbank/saman.png';
import sarmaye from '../../../../images/selectedbank/sarmaye.png';
import sina from '../../../../images/selectedbank/sina-bank.png';
import tejarat from '../../../../images/selectedbank/tejarat.png';
import refah from '../../../../images/selectedbank/refah-bank.png';
import postbank from '../../../../images/selectedbank/postbank.png';
import toseetavon from '../../../../images/selectedbank/toseetavon.png';
import pasargad from '../../../../images/selectedbank/pasargad.png';
import shahr from '../../../../images/selectedbank/shahr.png';
import mellat from '../../../../images/selectedbank/mellat.png';
import mehreghteshad from '../../../../images/selectedbank/mehreghteshad.png';
import ayandeh from '../../../../images/selectedbank/ayandeh.svg';
import day from '../../../../images/selectedbank/day.png';
import ghavamin from '../../../../images/selectedbank/ghavamin.png';
import toseeIns from '../../../../images/selectedbank/toseeIns.png';
import kowsarIns from '../../../../images/selectedbank/kowsar.png';
import bankmarkazi from '../../../../images/selectedbank/bankmarkazi.png';
import hekmat from '../../../../images/selectedbank/hekmat.png';
import gardeshgari from '../../../../images/selectedbank/gardeshgari.png';
import ToseeSaderat from '../../../../images/selectedbank/ToseeSaderat.png';
import iranzamin from '../../../../images/selectedbank/iranzamin.png';
import mehrIranian from '../../../../images/selectedbank/mehriranian.png';

import { transFn } from '../../../components/lang';

export default (props) => {
    switch (props.substring(0, 7)) {
        case '6395 99':
            return [`${transFn('bank')} ${transFn('ghavamin')}`, ghavamin];
        case '6281 57':
            return [`${transFn('bank')} ${transFn('toseeIns')}`, toseeIns];
        case '5058 01':
            return [`${transFn('bank')} ${transFn('kowsarIns')}`, kowsarIns];
        case '6393 47':
            return [`${transFn('bank')} ${transFn('pasargardBank')}`, pasargad];
        case '9919 75':
            return [`${transFn('bank')} ${transFn('melatBank')}`, mellat];
        case '6392 17':
            return [`${transFn('bank')} ${transFn('keshavarziBank')}`, agribank];
        case '6391 94':
            return [`${transFn('bank')} ${transFn('parsianbank')}`, parsian];
        case '6278 84':
            return [`${transFn('bank')} ${transFn('parsianbank')}`, parsian];
        case '6367 95':
            return [`${transFn('bank')} ${transFn('bankmarkazi')}`, bankmarkazi];
        case '6369 49':
            return [`${transFn('bank')} ${transFn('hekmat')}`, hekmat];
        case '5054 16':
            return [`${transFn('bank')} ${transFn('gardeshgari')}`, gardeshgari];
        case '2071 77':
            return [`${transFn('bank')} ${transFn('ToseeSaderat')}`, ToseeSaderat];
        case '5057 85':
            return [`${transFn('bank')} ${transFn('iranzamin')}`, iranzamin];
        case '6063 73':
            return [`${transFn('bank')} ${transFn('mehriranian')}`, mehrIranian];
        case '5029 10':
            return [transFn('karafarinBank'), karAfarin];
        case '6037 99':
            return [`${transFn('bank')} ${transFn('meliBank')}`, meli];
        case '5892 10':
            return [`${transFn('bank')} ${transFn('sepahBank')}`, sepah];
        case '6276 48':
            return [`${transFn('bank')} ${transFn('toseBank')}`, toseetavon];
        case '6279 61':
            return [`${transFn('bank')} ${transFn('sanatBank')}`, industrymine];
        case '6037 70':
            return [`${transFn('bank')} ${transFn('keshavarziBank')}`, agribank];
        case '6280 23':
            return [`${transFn('bank')} ${transFn('maskanBank')}`, maskan];
        case '6277 60':
            return [`${transFn('bank')} ${transFn('postBank')}`, postbank];
        case '5029 08':
            return [`${transFn('bank')} ${transFn('toseTavonBank')}`, toseetavon];
        case '6274 12':
            return [`${transFn('bank')} ${transFn('eghtesadBank')}`, enbank];
        case '6221 06':
            return [`${transFn('bank')} ${transFn('parsianbank')}`, parsian];
        case '5022 29':
            return [`${transFn('bank')} ${transFn('pasargardBank')}`, pasargad];
        case '6274 88':
            return [`${transFn('bank')} ${transFn('karafarinBank')}`, karAfarin];
        case '6219 86':
            return [`${transFn('bank')} ${transFn('samanbank')}`, saman];
        case '6393 46':
            return [`${transFn('bank')} ${transFn('sinaBank')}`, sina];
        case '6396 07':
            return [`${transFn('bank')} ${transFn('sarmayeBank')}`, sarmaye];
        case '6362 14':
            return [`${transFn('bank')} ${transFn('ayandeBank')}`, ayandeh];
        case '5028 06':
            return [`${transFn('bank')} ${transFn('shahrBank')}`, shahr];
        case '5029 38':
            return [`${transFn('bank')} ${transFn('deyBank')}`, day];
        case '6037 69':
            return [`${transFn('bank')} ${transFn('saderatBank')}`, saderat];
        case '6104 33':
            return [`${transFn('bank')} ${transFn('melatBank')}`, mellat];
        case '6273 53':
            return [`${transFn('bank')} ${transFn('tejarat')}`, tejarat];
        case '5894 63':
            return [`${transFn('bank')} ${transFn('refahbank')}`, refah];
        case '6273 81':
            return [`${transFn('bank')} ${transFn('ansarBank')}`, ansar];
        case '6393 70':
            return [
                `${transFn('bank')} ${transFn('mehrEghtesadBank')}`,
                mehreghteshad,
            ];
    }
    switch (props.substring(0, 6)) {
        case '6395 99':
            return [`${transFn('bank')} ${transFn('ghavamin')}`, ghavamin];
        case '628157':
            return [`${transFn('bank')} ${transFn('toseeIns')}`, toseeIns];
        case '505801':
            return [`${transFn('bank')} ${transFn('kowsarIns')}`, kowsarIns];
        case '639347':
            return [`${transFn('bank')} ${transFn('pasargardBank')}`, pasargad];
        case '991975':
            return [`${transFn('bank')} ${transFn('melatBank')}`, mellat];
        case '639217':
            return [`${transFn('bank')} ${transFn('keshavarziBank')}`, agribank];
        case '639194':
            return [`${transFn('bank')} ${transFn('parsianbank')}`, parsian];
        case '627884':
            return [`${transFn('bank')} ${transFn('parsianbank')}`, parsian];
        case '636795':
            return [`${transFn('bank')} ${transFn('bankmarkazi')}`, bankmarkazi];
        case '636949':
            return [`${transFn('bank')} ${transFn('hekmat')}`, hekmat];
        case '505416':
            return [`${transFn('bank')} ${transFn('gardeshgari')}`, gardeshgari];
        case '207177':
            return [`${transFn('bank')} ${transFn('ToseeSaderat')}`, ToseeSaderat];
        case '505785':
            return [`${transFn('bank')} ${transFn('iranzamin')}`, iranzamin];
        case '606373':
            return [`${transFn('bank')} ${transFn('mehriranian')}`, mehrIranian];
        case '502910':
            return [transFn('karafarinBank'), karAfarin];
        case '603799':
            return [`${transFn('bank')} ${transFn('meliBank')}`, meli];
        case '589210':
            return [`${transFn('bank')} ${transFn('sepahBank')}`, sepah];
        case '627648':
            return [`${transFn('bank')} ${transFn('toseBank')}`, toseeIns];
        case '627961':
            return [`${transFn('bank')} ${transFn('sanatBank')}`, industrymine];
        case '603770':
            return [`${transFn('bank')} ${transFn('keshavarziBank')}`, agribank];
        case '628023':
            return [`${transFn('bank')} ${transFn('maskanBank')}`, maskan];
        case '627760':
            return [`${transFn('bank')} ${transFn('postBank')}`, postbank];
        case '502908':
            return [`${transFn('bank')} ${transFn('toseTavonBank')}`, toseetavon];
        case '627412':
            return [`${transFn('bank')} ${transFn('eghtesadBank')}`, enbank];
        case '622106':
            return [`${transFn('bank')} ${transFn('parsianbank')}`, parsian];
        case '502229':
            return [transFn('pasargardBank'), pasargad];
        case '627488':
            return [transFn('karafarinBank'), karAfarin];
        case '621986':
            return [`${transFn('bank')} ${transFn('samanbank')}`, saman];
        case '639346':
            return [`${transFn('bank')} ${transFn('sinaBank')}`, sina];
        case '639607':
            return [`${transFn('bank')} ${transFn('sarmayeBank')}`, sarmaye];
        case '636214':
            return [`${transFn('bank')} ${transFn('ayandeBank')}`, ayandeh];
        case '502806':
            return [`${transFn('bank')} ${transFn('shahrBank')}`, shahr];
        case '502938':
            return [`${transFn('bank')} ${transFn('deyBank')}`, day];
        case '603769':
            return [`${transFn('bank')} ${transFn('saderatBank')}`, saderat];
        case '610433':
            return [`${transFn('bank')} ${transFn('melatBank')}`, mellat];
        case '627353':
            return [`${transFn('bank')} ${transFn('tejarat')}`, tejarat];
        case '589463':
            return [`${transFn('bank')} ${transFn('refahbank')}`, refah];
        case '627381':
            return [`${transFn('bank')} ${transFn('ansarBank')}`, ansar];
        case '639370':
            return [
                `${transFn('bank')} ${transFn('mehrEghtesadBank')}`,
                mehreghteshad,
            ];
        default:
            return ['', ''];
    }
};
