import React from 'react'
import classes from '../styles/SoundList.module.css'


function SoundList() {
    return (
        <div className={classes.SoundList}>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Genre</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Chlorine</td>
                        <td>Twenty One Pilots</td>
                        <td>Indie</td>
                    </tr>
                    <tr>
                        <td>Наосліп</td>
                        <td>Sad Novelist</td>
                        <td>Indie</td>
                    </tr>
                    <tr>
                        <td>Мене вже немає</td>
                        <td>Sad Novelist</td>
                        <td>Indie</td>
                    </tr>
                    <tr>
                        <td>Світло</td>
                        <td>Sad Novelist</td>
                        <td>Indie</td>
                    </tr>
                    <tr>
                        <td>Світло</td>
                        <td>Sad Novelist</td>
                        <td>Indie</td>
                    </tr>
                    <tr>
                        <td>Світло</td>
                        <td>Sad Novelist</td>
                        <td>Indie</td>
                    </tr>
                    <tr>
                        <td>Світло</td>
                        <td>Sad Novelist</td>
                        <td>Indie</td>
                    </tr>
                    <tr>
                        <td>Світло</td>
                        <td>Sad Novelist</td>
                        <td>Indie</td>
                    </tr>
                    <tr>
                        <td>Світло</td>
                        <td>Sad Novelist</td>
                        <td>Indie</td>
                    </tr>
                    <tr>
                        <td>Світло</td>
                        <td>Sad Novelist</td>
                        <td>Indie</td>
                    </tr>
                    <tr>
                        <td>Світло</td>
                        <td>Sad Novelist</td>
                        <td>Indie</td>
                    </tr>
                    <tr>
                        <td>Світло</td>
                        <td>Sad Novelist</td>
                        <td>Indie</td>
                    </tr>
                    <tr>
                        <td>Світло</td>
                        <td>Sad Novelist</td>
                        <td>Indie</td>
                    </tr>
                    <tr>
                        <td>Світло</td>
                        <td>Sad Novelist</td>
                        <td>Indie</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan={3}>
                            <button className={classes.PageButton}>1</button>
                            <button className={classes.PageButton}>2</button>
                            <button className={classes.PageButton}>3</button>
                            <button className={classes.PageButton}>4</button>
                            <button className={classes.PageButton}>5</button>
                            <button className={classes.PageButton}>6</button>
                            <button className={classes.PageButton}>7</button>
                            <button className={classes.PageButton}>...</button>
                            <button className={classes.PageButton}>107</button>
                            <button className={classes.PageButton}>108</button>
                            <button className={classes.PageButton}>109</button>
                        </th>
                    </tr>
                </tfoot>
            </table>

        </div>
    )
}

export default SoundList