import AWS from 'aws-sdk';

/* eslint-disable import/no-mutable-exports */
export let s3 = {};
export let beanstalk = {};
export let iam = {};
export let autoScaling = {};
export let acm = {};
/* eslint-enable import/no-mutable-exports */

export default function configure({ auth, name, region }) {
  const options = {
    accessKeyId: auth.id,
    secretAccessKey: auth.secret,
    region: region || 'us-east-1'
  };

  AWS.config.update(options);

  s3 = new AWS.S3({ params: { Bucket: `mup-${name}` }, apiVersion: '2006-03-01' });
  beanstalk = new AWS.ElasticBeanstalk({ apiVersion: '2010-12-01' });
  iam = new AWS.IAM({ apiVersion: '2010-05-08' });
  autoScaling = new AWS.AutoScaling({ apiVersion: '2011-01-01' });
  acm = new AWS.ACM({ apiVersion: '2015-12-08' });
}
