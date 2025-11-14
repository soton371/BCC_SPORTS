import PopupClient from './popup-client';

type Props = {};

const Popup = async (props: Props) => {
  return (
    <PopupClient
      popup={false}
      popupData={{
        id: 1,
        agency_id: 101,
        title: 'Welcome to Sohi',
        thumbnail: '/images/popup_welcome.jpg',
        description:
          'Experience hassle-free airport services with our premium Meet & Assist package.',
        status: true,
        link: '/services/meet-assist',
        pop_up_for: 'homepage',
      }}
    />
  );
};

export default Popup;
