<?xml version="1.0"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
     <xsl:for-each select="/gsmrs/competition/season[contains(@name,'2013')]/..">
      <xsl:sort select="@name"/>
      <option>
         <xsl:if test="@competition_id = 16">
           <xsl:attribute name="selected">
             <xsl:text>selected</xsl:text>
           </xsl:attribute>
         </xsl:if>
         <xsl:attribute name="value">
           <xsl:value-of select="season[contains(@name, '2013')]/@season_id"/>
         </xsl:attribute> 
        <xsl:value-of select="@name"/>
       </option>
     </xsl:for-each>
</xsl:template>
</xsl:stylesheet>