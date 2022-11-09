import React from 'react';
import './style/newList.scss';
import { useMoviesList } from './hooks/use-movies-list';

interface IMovieList {
    title: string;
}

const NewList: React.FC<IMovieList> = ({ title }) => {
    const { isAllReady, movies, handleChange, handleSelect, handleSubmit } =
        useMoviesList();

    return (
        <div className='moviesList'>
            <div className='top'>
                <h1 className='title'>Add New {title}</h1>
            </div>

            <div className='bottom'>
                <div className='header'>
                    <div className='left'>
                        <form>
                            <div className='formInput'>
                                <label htmlFor='title'>Title</label>

                                <input
                                    type='text'
                                    id='title'
                                    name='title'
                                    placeholder='Popular Movies'
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>

                            <div className='formInput'>
                                <label htmlFor='genre'>Genre</label>

                                <input
                                    type='text'
                                    id='genre'
                                    name='genre'
                                    placeholder='action'
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>

                            <div className='formInput select'>
                                <label htmlFor='type'>Type</label>

                                <select
                                    name='type'
                                    id='type'
                                    onChange={(e) => handleChange(e)}
                                    style={{ width: '104%' }}
                                >
                                    <option>Type</option>
                                    <option value='movies'>Movies</option>
                                    <option value='series'>Series</option>
                                </select>
                            </div>
                        </form>
                    </div>

                    <div className='right'>
                        <form>
                            <div className='formInput select'>
                                <label htmlFor='content'>Content</label>

                                <select
                                    multiple={true}
                                    name='content'
                                    id='content'
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
                </div>

                <button onClick={(e) => handleSubmit(e)}>
                    {!isAllReady ? 'CLOSE AND EXIT' : 'CREATE'}
                </button>
            </div>
        </div>
    );
};

export default NewList;
