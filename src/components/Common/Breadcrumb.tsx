import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Row, Col, BreadcrumbItem } from "reactstrap";
import Page from "src/constants/pages";

interface BreadcrumbProps {
  breadcrumbItem: string;
  title: string;
  link?: string;
}

const Breadcrumb = ({ breadcrumbItem, title, link = "" }: BreadcrumbProps) => {
  const { t } = useTranslation();
  return (
    <Row>
      <Col xs="12">
        <div className="page-title-box">
          <h3 className="mb-2">{t(title)}</h3>
          <div className="page-title-right">
            <ol className="breadcrumb m-0">
              <BreadcrumbItem>
                <Link to={Page.DASHBOARD}>{t("Home")}</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>
                <Link to={link || "#"}>{t(breadcrumbItem)}</Link>
              </BreadcrumbItem>
            </ol>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Breadcrumb;
