<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:variable name="varMatchId">1063203</xsl:variable>
	<xsl:template match="/">
		<xsl:apply-templates select="//match[@match_id = $varMatchId]"/>
	</xsl:template>
	<xsl:template match="match">
		<xsl:variable name="teamAId"><xsl:value-of select="@team_A_id"/></xsl:variable>
		<xsl:variable name="teamBId"><xsl:value-of select="@team_B_id"/></xsl:variable>
		<ul id="detailsLegend">
			<li class="as">Assistance</li>
			<li class="og">Own Goal</li>
			<li class="YC">Yellow Card</li>
			<li class="Y2C">2nd Yellow Card</li>
			<li class="RC">Red Card</li>
		</ul>

		<table class="detailInfoTable">
			<thead>
				<tr>
					<th><xsl:value-of select="@team_A_name"/></th>
					<th><xsl:value-of select="@team_B_name"/></th>
				</tr>
				<tr>
					<th colspan="2">GOALS</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><ul><xsl:apply-templates select="goals/goal/event[@team_id=$teamAId and (@code='G' or @code='OG' or @code='PG')]"/></ul></td>
					<td><ul><xsl:apply-templates select="goals/goal/event[@team_id=$teamBId and (@code='G' or @code='OG' or @code='PG')]"/></ul></td>
				</tr>
			</tbody>
		</table>
		<table class="detailInfoTable">
			<thead>
				<tr>
					<th colspan="2">Substitutions</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><ul><xsl:apply-templates select="substitutions/sub/event[@team_id=$teamAId]/.."/></ul></td>
					<td><ul><xsl:apply-templates select="substitutions/sub/event[@team_id=$teamBId]/.."/></ul></td>
				</tr>
			</tbody>
		</table>
		<table class="detailInfoTable">
			<thead>
				<tr>
					<th colspan="2">Cards</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><ul><xsl:apply-templates select="bookings/event[@team_id=$teamAId]"/></ul></td>
					<td><ul><xsl:apply-templates select="bookings/event[@team_id=$teamBId]"/></ul></td>
				</tr>
			</tbody>
		</table>

	</xsl:template>
	<xsl:template match="goal/event[@code='G' or @code='PG' or @code='OG']">
		<xsl:if test="@code = 'OG'">
			<li class="og">
				<xsl:value-of select="@person"/>
				<div class="as">
					<xsl:value-of select="../event[@code='AS']/@person"/>
				</div>
			</li>
		</xsl:if>
		<xsl:if test="@code != 'OG'">
			<li>
				<xsl:value-of select="@person"/>
				<div class="as">
					<xsl:value-of select="../event[@code='AS']/@person"/>
				</div>
			</li>
		</xsl:if>
				
	</xsl:template>
	<xsl:template match="sub">
		<li>
			<xsl:value-of select="event[@code='SI']/@person"/>
			<xsl:text>, </xsl:text>
			<xsl:value-of select="event[@code='SO']/@person"/>
		</li>
	</xsl:template>
	<xsl:template match="bookings/event">
		<li>
			<xsl:attribute name="class">
				<xsl:value-of select="@code"/>
			</xsl:attribute>
			<xsl:value-of select="@person"/>
		</li>
	</xsl:template>
</xsl:stylesheet>