import React from 'react'
import { Modal, ModalBody, ModalHeader, Table } from "reactstrap";

const ModalGeoInCampaigns = ({isOpen, toggleClose, campaigns} : any) => {

  return (
    <Modal isOpen={isOpen} toggle={toggleClose} centered={true}>
      <ModalHeader toggle={toggleClose} tag="h4">
        Information
      </ModalHeader>
      <ModalBody>
        <h6>
          This GEO is used in active Campaigns.<br />
          To delete this GEO, please delete active CampaignRows with it
        </h6>
        <Table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Campaign Name</th>
            <th>Amount</th>
          </tr>
          </thead>
          <tbody>
            {campaigns.map((item: any) => (
              <tr key={item.campaignId}>
                <td>{item.campaignId}</td>
                <td>{item.campaignName}</td>
                <td>{item.amount}</td>
              </tr>
              ))}
          </tbody>
        </Table>
      </ModalBody>
    </Modal>
  )

}

export default ModalGeoInCampaigns;
