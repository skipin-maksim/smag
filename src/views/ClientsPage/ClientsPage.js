import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TitleTableClient from '../../components/WindowTable/TitleTableClient/TitleTableClient';
import WindowTable from '../../components/WindowTable/WindowTable';

import { clientsOperations, clientsSelectors } from '../../redux/clients';

import Spinner from '../../components/Spinner/Spinner';
import LineClient from '../../components/LineClient/LineClient';

import s from './ClientsPage.module.scss';

export default function ClientsPage() {
  const dispatch = useDispatch();

  const isLoading = useSelector(clientsSelectors.getIsLoading);
  const clientsList = useSelector(clientsSelectors.getAllClientsList);

  const getAllClients = useCallback(() => {
    dispatch(clientsOperations.getClients());
  }, [dispatch]);

  useEffect(() => {
    getAllClients();
  }, [getAllClients]);

  return (
    <div className={s.clientPage}>
      {isLoading && <Spinner />}
      <TitleTableClient />
      <WindowTable>
        <ul>
          {clientsList.map((client, idx) => {
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
