import React from 'react';
import './style/viewMovie.scss';

import { MdCheck, MdOutlineDriveFolderUpload, MdPublish } from 'react-icons/md';
import { movieInputs } from '../../static-data/data/form-source';
import spinner from '../../static-data/img/spinner.svg';

import { useUpdateMovie } from './hooks/use-update-movie';

import { IMovie } from '../../types/types';
interface IUserCard {
    item: IMovie;
    titleCard: string;
}

const ViewMovie: React.FC<IUserCard> = ({ item, titleCard }) => {
    const {
        _id,
        title,
        description,
        img,
        imgTitle,
        imgSm,
        trailer,
        video,
        year,
        limit,
        genre,
        isSeries,
    } = item;
    const {
        isLoading,
        isEdit,
        setIsEdit,

        movieAvatar,
        handleMovieAvatar,

        handleChangeFile,
        handleChangeText,
        handleUpdate,

        navigate,
        files,
    } = useUpdateMovie(
        img,
        imgTitle,
        imgSm,
        trailer,
        video,
        genre,
        String(isSeries)
    );
    const imgUrl = movieAvatar
        ? URL.createObjectURL(movieAvatar as Blob | MediaSource)
        : img;

    return (
        <>
            <div className='top'>
                <div className='left'>
                    <div
                        className='editButton'
                        onClick={() => setIsEdit(!isEdit)}
                    >
                        {!isEdit ? 'Edit' : 'Close'}
                    </div>

                    <h1 className='title'>{titleCard} information</h1>

                    <div className='item'>
                        <img src={img} alt={title} />

                        <div className='details'>
                            <h1 className='itemTitle'>{title}</h1>

                            <div className='detailItem'>
                                <span className='itemKey'>ID:</span>
                                <span className='itemValue'>{_id}</span>
                            </div>

                            <div className='detailItem'>
                                <span className='itemKey'>Title:</span>
                                <span className='itemValue'>{title}</span>
                            </div>

                            <div className='detailItem'>
                                <span className='itemKey'>Description:</span>
                                <span className='itemValue'>{description}</span>
                            </div>

                            <div className='detailItem'>
                                <span className='itemKey'>Year:</span>
                                <span className='itemValue'>{year}</span>
                            </div>

                            <div className='detailItem'>
                                <span className='itemKey'>Genre:</span>
                                <span className='itemValue'>{genre}</span>
                            </div>

                            <div className='detailItem'>
                                <span className='itemKey'>Limit:</span>
                                <span className='itemValue'>{limit}</span>
                            </div>

                            <div className='detailItem'>
                                <span className='itemKey'>Type:</span>
                                <span className='itemValue'>
                                    {isSeries ? 'series' : 'movie'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={isEdit ? 'bottom' : 'hide'}>
                <div className='editContent'>
                    <img src={imgUrl} alt='img' />

                    <div className='left'>
                        <form>
                            {movieInputs.loadingMedia.map((i) => {
                                if (i.flag === 'image') {
                                    return (
                                        <div key={i.id} className='updateMedia'>
                                            {files[i.htmlId] && (
                                                <MdCheck className='check' />
                                            )}

                                            <label
                                                htmlFor={i.htmlId}
                                                className='img'
                                            >
                                                {i.label}{' '}
                                                <MdOutlineDriveFolderUpload className='icon' />
                                            </label>

                                            <input
                                                type='file'
                                                id={i.htmlId}
                                                name={i.htmlId}
                                                style={{ display: 'none' }}
                                                onChange={(e) => {
                                                    if (i.htmlId === 'img') {
                                                        handleMovieAvatar(e);
                                                        handleChangeFile(e);
                                                    } else {
                                                        handleChangeFile(e);
                                                    }
                                                }}
                                            />
                                        </div>
                                    );
                                } else return null;
                            })}
                        </form>

                        <form>
                            {movieInputs.loadingMedia.map((i) => {
                                if (i.flag === 'media') {
                                    return (
                                        <div key={i.id} className='updateVideo'>
                                            {files[i.htmlId] && (
                                                <MdCheck className='check' />
                                            )}

                                            <label htmlFor={i.htmlId}>
                                                {i.label}
                                            </label>
                                            <input
                                                type='file'
                                                id={i.htmlId}
                                                name={i.htmlId}
                                                onChange={(e) =>
                                                    handleChangeFile(e)
                                                }
                                            />
                                        </div>
                                    );
                                } else return null;
                            })}
                        </form>
                    </div>

                    <form className='right'>
                        <label htmlFor='title'>Title:</label>
                        <input
                            type='text'
                            id='title'
                            name='title'
                            placeholder={title}
                            onChange={(e) => handleChangeText(e)}
                        />

                        <label htmlFor='description'>Description:</label>
                        <input
                            type='text'
                            id='description'
                            name='description'
                            placeholder={description}
                            onChange={(e) => handleChangeText(e)}
                        />

                        <label htmlFor='year'>Year:</label>
                        <input
                            type='text'
                            id='year'
                            name='year'
                            placeholder={year}
                            onChange={(e) => handleChangeText(e)}
                        />

                        <label htmlFor='limit'>Limit:</label>
                        <input
                            type='text'
                            id='limit'
                            name='limit'
                            placeholder={String(limit)}
                            onChange={(e) => handleChangeText(e)}
                        />

                        <label htmlFor='genre'>Genre:</label>
                        <select
                            name='genre'
                            id='genre'
                            onChange={(e) => handleChangeText(e)}
                            defaultValue={genre}
                        >
                            <option value='adventure'>Adventure</option>
                            <option value='comedy'>Comedy</option>
                            <option value='crime'>Crime</option>
                            <option value='fantasy'>Fantasy</option>
                            <option value='historical'>Historical</option>
                            <option value='horror'>Horror</option>
                            <option value='romance'>Romance</option>
                            <option value='sci-fi'>Sci-fi</option>
                            <option value='thriller'>Thriller</option>
                            <option value='western'>Western</option>
                            <option value='animation'>Animation</option>
                            <option value='drama'>Drama</option>
                            <option value='documentary'>Documentary</option>
                        </select>

                        <label htmlFor='isSeries'>Is series?</label>
                        <select
                            name='isSeries'
                            id='isSeries'
                            onChange={(e) => handleChangeText(e)}
                            defaultValue={String(isSeries)}
                        >
                            <option value='false'>No</option>
                            <option value='true'>Yes</option>
                        </select>
                    </form>
                </div>

                <button
                    disabled={isLoading}
                    className='upBtn'
                    onClick={(e) => handleUpdate(e, _id as string)}
                >
                    {isLoading ? <img src={spinner} alt='spinner' /> : 'UPDATE'}
                </button>

                <div className='closeButton' onClick={() => navigate('../')}>
                    Reset
                </div>
            </div>
        </>
    );
};

export default ViewMovie;
