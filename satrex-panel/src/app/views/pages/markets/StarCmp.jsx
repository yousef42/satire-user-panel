import React, { useState } from 'react';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { useDispatch } from 'react-redux';
import { setfavortiMarket } from '../../../../utils/apis';
import { addFavoriteMark, removeFavMarket } from '../../../redux/actions/MarketActions';
import satrexToast from '../../../components/satrexToast';
import { satrexApi } from '../../../components/api';
import { transFn } from '../../../components/lang';

function StarCmp({ item }) {
    const dispatch = useDispatch();
    const [isFav, setIsFav] = useState(item.pairIsFavorite);

    const addfavortiMarket = async (row) => {
        await setfavortiMarket({
            pairId: row.pairId,
        });
        await dispatch(addFavoriteMark(row));
        setIsFav(true);
    };

    const removeFavoriteMarket = async (row) => {
       try {
           await satrexApi()
               .post('/Pair/RemoveFromFavorite', {
                   pairId: row.pairId,
               });
           await dispatch(removeFavMarket(row));
           setIsFav(false);
           satrexToast(transFn('marketRemovedFromFav'), 'success');
       } catch (e) {
           satrexToast(transFn('failedInMission'), 'error');
       }
    };

    return (
        <div className="row">
            {!isFav && (
                <StarOutlineRoundedIcon
                    onClick={(e) => {
                        e.stopPropagation();
                        addfavortiMarket(item);
                    }}
                    data-tut="addToFav"
                    className="addToFav"
                    style={{ fontSize: '15px', opacity: '0.3', marginTop: 3 }}
                />
            )}
            {(isFav) && (

                <StarRoundedIcon
                    style={{ fontSize: '15px', opacity: '0.3' }}
                    onClick={(e) => {
                        e.stopPropagation();
                        removeFavoriteMarket(item);
                    }}
                    data-tut="addToFav"
                    className="addToFav"
                />
            )}

        </div>
    );
}

export default StarCmp;
