import React from 'react';

import './style/viewList.scss';

import { useMoviesListCard } from './hooks/use-movies-list-card';
import { IList } from '../../types/types';

interface IMoviesListCard {
    item: IList;
    titleCard: string;
}

const ViewList: React.FC<IMoviesListCard> = ({ item, titleCard }) => {
    const { _id, title, genre, type, content } = item;
    const {
        isEdit,
        handleChange,
        handleUpdate,
        handleEdit,
        handleSelect,
        movies,
    } = useMoviesListCard(_id as string, type, content);

    return (
        <div className='moviesListCard'>
            <div className='current'>
                <h1 className='title'>{titleCard} information</h1>

                <h1>{title}</h1>

                <div>
                    <span className='key'>ID:</span>
                    <span className='value'>{_id}</span>
                </div>

                <div>
                    <span className='key'>Type:</span>
                    <span className='value'>{type}</span>
                </div>

                <div>
                    <span className='key'>Genre:</span>
                    <span className='value'>{genre}</span>
                </div>

                <button onClick={() => handleEdit()}>
                    {!isEdit ? 'OPEN' : 'CLOSE'} EDIT
                </button>
            </div>

            <form className={!isEdit ? 'hide' : undefined}>
                <label htmlFor='titleML'>List Title</label>
                <input
                    type='text'
                    id='titleML'
                    name='title'
                    placeholder={title as string}
                    onChange={(e) => handleChange(e)}
                />

                <label htmlFor='genreML'>Genre</label>
                <input
                    type='text'
                    id='genreML'
                    name='genre'
                    placeholder={genre}
                    onChange={(e) => handleChange(e)}
                />

                <label htmlFor='typeML'>Type</label>

                <select
                    name='type'
                    id='typeML'
                    defaultValue={type}
                    onChange={(e) => handleChange(e)}
                >
                    <option value='movies'>Movies</option>
                    <option value='series'>Series</option>
                </select>

                <button onClick={(e) => handleUpdate(e)}>UPDATE</button>
            </form>

            <form className={!isEdit ? 'hide' : undefined}>
                <div className='updateContent'>
                    <label htmlFor='contentUpdate'>Content</label>

                    <select
                        multiple={true}
                        name='content'
                        id='contentUpdate'
                        onChange={(e) => handleSelect(e)}
                        style={{ height: '230px' }}
                    >
                        {movies.map((i) => {
                            return (
                                <option key={i._id} value={i._id}>
                                    {i.title}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </form>
        </div>
    );
};

export default ViewList;
