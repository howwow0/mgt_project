import React from "react";
import '../styles/Contacts.css';

const Contacts = () =>
{
    return
    (
        <div className="Contacts">

            <div className="contacts-container">
                <div>
                    <img src="nikita.png"></img>
                    <p style={{color: "gold"}}>Никита Ярощук</p>
                    <p>Тимлид</p>
                    <p>Бэкенд-разработчик</p>
                    <div className ="src-img">
                        <a href="https://github.com/howwow0"><img src="../github.png"></img></a>
                        <a href="https://t.me/how_wow0"><img src="telegram.png"></img></a>
                    </div>
                </div>
                <div>
                    <img src="andrew.png"></img>
                    <p style={{color: "gold"}}>Андрей Стародубов</p>
                    <p>ДевОпс</p>
                    <p>Фронтенд-разработчик</p>
                    <div className="src-img">
                        <a href="https://github.com/andrew-dot-exe"><img src="github.png"></img></a>
                        <a href="https://t.me/andrewdotexe"><img src="telegram.png"></img></a>
                    </div>
                </div>
                <div>
                    <img src="dima.jpg"></img>
                    <p style={{color: "gold"}}>Дмитрий Никифоров</p>
                    <p>Разработчик матмодели</p>
                    <p>Бэкенд-разработчик</p>
                    <div className="src-img">
                        <a href="https://github.com/DimaNik5"><img src="github.png"></img></a>
                        <a href="https://t.me/DimaNikiforov5"><img src="telegram.png"></img></a>
                    </div>
                </div>
                <div>
                    <img src="danil.jpeg"></img>
                    <p style={{color: "gold"}}>Даниил Купцов</p>
                    <p>Веб-дизайнер</p>
                    <p>Фронтенд-разработчик</p>
                    <div className="src-img">
                        <a href="https://github.com/Danik3813"><img src="github.png"></img></a>
                        <a href="https://t.me/Danik3813"><img src="telegram.png"></img></a>
                    </div>
                </div>
            </div>

        </div>
    );
};