import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TitleTableClient from '../../components/WindowTable/TitleTableClient/TitleTableClient';
import WindowTable from '../../components/WindowTable/WindowTable';

import { clientsOperations, clientsSelectors } from '../../redux/clients';

import Spinner from '../../components/Spinner/Spinner';
import LineClient from '../../components/LineClient/LineClient';

import s from './ClientsPage.module.scss';
import SettingsBlockBtn from '../../components/BlocksForClientsPage/SettingsBlockBtn/SettingsBlockBtn';

export default function ClientsPage() {
  const [searchClient, setSearchClient] = useState('');
  const dispatch = useDispatch();

  const isLoading = useSelector(clientsSelectors.getIsLoading);
  const clientsList = useSelector(clientsSelectors.getAllClientsList);

  const getAllClients = useCallback(() => {
    dispatch(clientsOperations.getClients());
  }, [dispatch]);

  useEffect(() => {
    getAllClients();
  }, [getAllClients]);

  const visibleClientsList = clientsList.filter(client =>
    client.secondName.toLowerCase().includes(searchClient),
  );

  return (
    <div className={s.clientPage}>
      <div className={s.controlsBlock}>
        <input
          type="text"
          value={searchClient}
          onChange={({ target }) => setSearchClient(target.value)}
        ></input>
        <SettingsBlockBtn />
      </div>

      {isLoading && <Spinner />}
      <TitleTableClient />
      <WindowTable>
        <ul>
          {visibleClientsList.map((client, idx) => {
            return (
              <LineClient
                key={client._id}
                id={client._id}
                idx={idx}
                client={client}
              />
            );
          })}
        </ul>
      </WindowTable>
    </div>
  );
}
