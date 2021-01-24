import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TitleTableClient from '../../components/WindowTable/TitleTableClient/TitleTableClient';
import WindowTable from '../../components/WindowTable/WindowTable';

import { clientsOperations, clientsSelectors } from '../../redux/clients';

import Modal from '../../components/Modal/Modal';
import AddEditClientModal from '../../components/Modal/AddEditClientModal/AddEditClientModal';
import RemoveModal from '../../components/Modal/RemoveModal/RemoveModal';
import Spinner from '../../components/Spinner/Spinner';
import LineClient from '../../components/LineClient/LineClient';
import SettingsBlockBtn from '../../components/BlocksForClientsPage/SettingsBlockBtn/SettingsBlockBtn';

import s from './ClientsPage.module.scss';

export default function ClientsPage() {
  const [searchClient, setSearchClient] = useState('');
  const [isModalClient, setIsModalClient] = useState(false);
  const [isModalRemoveClient, setIsModalRemoveClient] = useState(false);

  const dispatch = useDispatch();

  const isLoading = useSelector(clientsSelectors.getIsLoading);
  const clientsList = useSelector(clientsSelectors.getAllClientsList);

  const onRemoveClients = useCallback(() => {
    dispatch(clientsOperations.removeClients(clientsList));
  }, [clientsList, dispatch]);

  const getAllClients = useCallback(() => {
    dispatch(clientsOperations.getClients());
  }, [dispatch]);

  useEffect(() => {
    getAllClients();
  }, [getAllClients]);

  const visibleClientsList = clientsList.filter(client =>
    client.secondName.toLowerCase().includes(searchClient),
  );

  const toggleModalCreateClient = () => {
    setIsModalClient(!isModalClient);
  };

  const toggleModalRemoveClient = () => {
    setIsModalRemoveClient(!isModalRemoveClient);
  };

  const handleRemoveClients = () => {
    onRemoveClients();
    toggleModalRemoveClient();
  };

  return (
    <>
      <div className={s.clientPage}>
        <div className={s.controlsBlock}>
          <input
            type="text"
            value={searchClient}
            onChange={({ target }) => setSearchClient(target.value)}
          />
          <SettingsBlockBtn
            createClient={toggleModalCreateClient}
            removeClient={toggleModalRemoveClient}
          />
        </div>

        {isLoading && <Spinner />}
        <TitleTableClient />
        <WindowTable>
          <ul>
            {visibleClientsList
              .map((client, idx) => {
                return (
                  <LineClient
                    key={client._id}
                    id={client._id}
                    idx={idx}
                    client={client}
                  />
                );
              })
              .sort((a, b) => {
                if (a.props.client.secondName > b.props.client.secondName) {
                  return 1;
                }
                if (a.props.client.secondName < b.props.client.secondName) {
                  return -1;
                }
                return 0;
              })}
          </ul>
        </WindowTable>
      </div>
      {isModalClient && (
        <Modal
          children={
            <AddEditClientModal onCloseModal={toggleModalCreateClient} />
          }
          onCloseModal={toggleModalCreateClient}
        />
      )}
      {isModalRemoveClient && (
        <Modal
          children={
            <RemoveModal
              onCloseModal={toggleModalRemoveClient}
              onRemove={handleRemoveClients}
            />
          }
          onCloseModal={toggleModalRemoveClient}
        />
      )}
    </>
  );
}
