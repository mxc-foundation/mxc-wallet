import React from 'react'
import Address from './Address'

const Heading = ({ routeHeading }: { routeHeading: string; }) => (
	<div>
		<h1>{routeHeading}</h1>
		<h2>
			<Address/>
			<i className="icon icon-contracts"/>
		</h2>
	</div>
)

export { Heading as Heading }